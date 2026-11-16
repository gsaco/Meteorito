"""Renderiza las figuras científicas de la presentación con los datos empaquetados.

Solo modifica assets/* de esta presentación; no modifica figuras del informe.
Requiere el entorno Python del informe y la cartografía local del proyecto.
"""
from pathlib import Path
import sys, json
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.path import Path as MplPath
from matplotlib.patches import Rectangle, ConnectionPatch
import cartopy.crs as ccrs
import cartopy.io.shapereader as shp

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT.parents[1]
sys.path.insert(0, str(PROJECT / 'entrega_meteoritos'))
from cartografia import paises_cartograficos, RECURSOS

BG, LAND, EDGE = '#0a202a', '#24484a', '#61858a'
TEXT, MUTED, TEAL, GOLD = '#eef1e9', '#a5b9b8', '#7de2dd', '#f4bd70'
GEO = ccrs.PlateCarree()
plt.rcParams.update({'font.family':'DejaVu Sans', 'font.size':12, 'text.color':TEXT,
    'axes.labelcolor':MUTED, 'xtick.color':MUTED, 'ytick.color':MUTED,
    'axes.edgecolor':EDGE, 'axes.facecolor':BG, 'figure.facecolor':BG,
    'axes.spines.top':False, 'axes.spines.right':False})
records = pd.DataFrame(json.loads((ROOT/'assets/meteoritos.json').read_text())['records'])
earth = records[records.terrestrial]
geo = earth[earth.mappable]
positive = earth[earth.mass.gt(0)]
assert len(geo) == 32186 and len(positive) == 45566

def save(fig, name):
    fig.savefig(ROOT/'assets'/name, dpi=210, facecolor=BG, bbox_inches='tight', pad_inches=.12)
    plt.close(fig)

def base(ax, extent=None, scale='50m'):
    ax.set_global() if extent is None else ax.set_extent(extent, crs=GEO)
    geometries = [g for _, g in paises_cartograficos(scale)]
    if extent:
        w,e,s,n = extent
        geometries = [g for g in geometries if g.bounds[2]>=w and g.bounds[0]<=e and g.bounds[3]>=s and g.bounds[1]<=n]
    ax.set_facecolor('#0c2530')
    ax.add_geometries(geometries, GEO, facecolor=LAND, edgecolor=EDGE, linewidth=.35)
    ax.spines['geo'].set_color(EDGE)
    ax.spines['geo'].set_linewidth(.6)

def legend(fig, outside=False):
    handles=[Line2D([],[],linestyle='',marker=m,color=c,markersize=6,label=label)
        for m,c,label in [('o',TEAL,'Found · encontrados'),('^',GOLD,'Fell · vistos caer')]]
    if outside:
        handles.append(Line2D([],[],linestyle='',marker='x',color='#95a8ad',markersize=6,label='Fuera del Perú'))
    fig.legend(handles=handles, loc='lower center', ncol=len(handles), frameon=False, fontsize=11)

fig=plt.figure(figsize=(10,5.35))
ax=fig.add_axes([.01,.10,.98,.88],projection=ccrs.EqualEarth())
base(ax)
ax.gridlines(xlocs=range(-180,181,60),ylocs=range(-60,61,30),linewidth=.4,color=EDGE,alpha=.3)
for fall,col,m,size in [('Found',TEAL,'o',4),('Fell',GOLD,'^',13)]:
    g=geo[geo.fall.eq(fall)]
    ax.scatter(g.lon,g.lat,transform=GEO,s=size,color=col,marker=m,alpha=.48 if fall=='Found' else .95,linewidths=0,zorder=3)
legend(fig);save(fig,'01_mapa_mundial.png')

fig=plt.figure(figsize=(10,5.3))
ax=fig.add_axes([.01,.04,.55,.94],projection=ccrs.SouthPolarStereo())
base(ax,[-180,180,-90,-60])
theta=np.linspace(0,2*np.pi,200)
ax.set_boundary(MplPath(np.column_stack([np.sin(theta),np.cos(theta)])*.5+.5),transform=ax.transAxes)
ax.gridlines(xlocs=range(-180,181,30),ylocs=[-80,-70,-60],linewidth=.4,color=EDGE,alpha=.4)
a=geo[geo.lat.lt(-60)]
assert len(a)==22099 and a.fall.eq('Found').all()
ax.scatter(a.lon,a.lat,transform=GEO,s=6,color=TEAL,alpha=.5,linewidths=0,zorder=3)
ax.text(.5,.5,'Polo Sur',transform=ax.transAxes,color=MUTED,fontsize=11,ha='center')
bars=fig.add_axes([.65,.24,.32,.55])
values=[100*len(a)/geo.fall.eq('Found').sum(),0]
for y,value,col,label in [(1,values[0],TEAL,'Found'),(0,0,GOLD,'Fell')]:
    bars.barh(y,100,color='#203f49',height=.16)
    bars.barh(y,value,color=col,height=.16)
    bars.text(0,y+.22,label,color=MUTED,fontsize=14)
    bars.text(100,y+.22,f'{value:.1f} %'.replace('.', ','),ha='right',color=col,fontsize=16)
    if value==0:bars.plot(0,y,'|',color=GOLD,markersize=12,clip_on=False)
bars.set(xlim=(0,100),ylim=(-.35,1.6),yticks=[],xticks=[0,50,100],xlabel='Porcentaje antártico (%)')
for sp in bars.spines.values():sp.set_visible(False)
bars.tick_params(length=0,pad=10)
save(fig,'02_antartida.png')

fig,ax=plt.subplots(figsize=(9.8,5.4))
groups=[positive.loc[positive.fall.eq(f),'mass'] for f in ['Found','Fell']]
assert [len(g) for g in groups]==[44491,1075]
bp=ax.boxplot(groups,positions=[0,1],widths=.42,patch_artist=True,
    medianprops={'color':TEXT,'linewidth':2},whiskerprops={'color':MUTED},capprops={'color':MUTED},
    flierprops={'marker':'.','markersize':2,'alpha':.22,'markeredgewidth':0,'markerfacecolor':MUTED})
for p,c in zip(bp['boxes'],[TEAL,GOLD]):p.set_facecolor(c);p.set_alpha(.65);p.set_edgecolor(c)
for i,(g,c) in enumerate(zip(groups,[TEAL,GOLD])):
    ax.text(i+.25,g.median(),f'{g.median():,.2f} g'.replace(',', ' ').replace('.', ','),color=c,fontsize=13,va='center')
ax.set(yscale='log',xticks=[0,1],xticklabels=['Found · encontrados','Fell · vistos caer'],ylabel='Masa catalogada (g) · escala logarítmica')
ax.set_xlim(-.6,1.8);ax.grid(axis='y',alpha=.12,color=MUTED);ax.set_axisbelow(True)
fig.tight_layout();save(fig,'06_cajas_masa_tipo.png')

fig,axes=plt.subplots(1,2,figsize=(10,5.4),sharey=True,gridspec_kw={'wspace':.09})
for ax,fall,c,n in zip(axes,['Found','Fell'],[TEAL,GOLD],[44203,1040]):
    g=positive[positive.fall.eq(fall)&positive.year.ge(1800)&positive.year.le(2013)]
    assert len(g)==n
    ax.scatter(g.year,g.mass,s=3 if fall=='Found' else 9,color=c,alpha=.22 if fall=='Found' else .6,linewidths=0,rasterized=True)
    ax.set(yscale='log',xlim=(1795,2018),xticks=[1800,1900,2000])
    ax.text(.03,.96,fall,transform=ax.transAxes,color=c,fontsize=14,va='top')
    ax.grid(axis='y',alpha=.1,color=MUTED);ax.set_axisbelow(True)
axes[0].set_ylabel('Masa catalogada (g) · escala logarítmica')
fig.supxlabel('Año registrado',color=MUTED,fontsize=12)
fig.subplots_adjust(bottom=.16,left=.10,right=.99,top=.97)
save(fig,'08_anio_masa.png')

# Proyección y detalle fronterizo: conserva la cartografía 1:10 millones.
fig=plt.figure(figsize=(10,5.65))
ax=fig.add_axes([.03,.12,.52,.86],projection=ccrs.LambertConformal(central_longitude=-75,central_latitude=-10,standard_parallels=(-5,-18),cutoff=20))
base(ax,[-82.5,-67.8,-19.5,1.2],'10m')
peru=next(g for n,g in paises_cartograficos('10m') if n=='Peru')
ax.add_geometries([peru],GEO,facecolor='#355e58',edgecolor='#8db6a1',linewidth=.7,zorder=2)
gl=ax.gridlines(draw_labels=True,xlocs=[-80,-75,-70],ylocs=[-15,-10,-5,0],color=EDGE,alpha=.3,linewidth=.4,x_inline=False,y_inline=False,rotate_labels=False)
gl.top_labels=gl.right_labels=False;gl.xlabel_style=gl.ylabel_style={'size':10,'color':MUTED}
for name,lon,lat in [('PERÚ',-74.6,-9),('BRASIL',-69.6,-8),('BOLIVIA',-68.9,-14),('ECUADOR',-78.5,-.25)]:
    ax.text(lon,lat,name,transform=GEO,ha='center',color=MUTED,fontsize=9,zorder=3)
ax.text(-80.7,-11.2,'OCÉANO\nPACÍFICO',transform=GEO,color='#7b9da7',fontsize=10,ha='center')
points=earth[earth.name.isin(['Carancas','Cerro La Tiza','Tambo Quemado','Daule'])]
offsets={'Carancas':(-48,-21),'Cerro La Tiza':(-70,14),'Tambo Quemado':(10,-7),'Daule':(10,5)}
for _,r in points.iterrows():
    c=GOLD if r.fall=='Fell' else TEAL
    ax.scatter(r.lon,r.lat,transform=GEO,s=38,c='#95a8ad' if r['name']=='Daule' else c,marker='x' if r['name']=='Daule' else '^' if r.fall=='Fell' else 'o',linewidths=.5,zorder=5)
    ax.annotate(r['name'],(r.lon,r.lat),xycoords=GEO._as_mpl_transform(ax),xytext=offsets[r['name']],textcoords='offset points',fontsize=10,color=TEXT,bbox={'facecolor':BG,'edgecolor':'none','alpha':.9,'pad':2},arrowprops={'arrowstyle':'-','lw':.5,'color':EDGE},zorder=6)
limit=[-69.55,-68.55,-17.05,-16.25]
ax.add_patch(Rectangle((limit[0],limit[2]),1,.8,transform=GEO,fill=False,edgecolor=GOLD,linewidth=.9,zorder=4))
inset=fig.add_axes([.62,.28,.36,.59],projection=ccrs.AzimuthalEquidistant(central_longitude=-69.04,central_latitude=-16.66))
base(inset,limit,'10m')
inset.add_geometries([peru],GEO,facecolor='#355e58',edgecolor='#8db6a1',linewidth=.8,zorder=2)
lakes=[r.geometry for r in shp.Reader(RECURSOS/'physical/ne_10m_lakes.shp').records() if r.geometry.bounds[0]<-68 and r.geometry.bounds[2]>-70 and r.geometry.bounds[1]<-15 and r.geometry.bounds[3]>-18]
inset.add_geometries(lakes,GEO,facecolor='#315d70',edgecolor=EDGE,linewidth=.3,zorder=3)
c=points[points.name.eq('Carancas')].iloc[0]
inset.scatter(c.lon,c.lat,transform=GEO,marker='^',s=90,color=GOLD,zorder=5)
inset.annotate('Carancas',(c.lon,c.lat),xycoords=GEO._as_mpl_transform(inset),xytext=(5,13),textcoords='offset points',fontsize=12,color=GOLD,zorder=6)
for name,lon,lat in [('PERÚ',-69.43,-16.65),('BOLIVIA',-68.91,-16.91),('Lago Titicaca',-69.12,-16.31)]:
    inset.text(lon,lat,name,transform=GEO,color=MUTED,fontsize=10,ha='center')
inset.plot([-40000,-20000],[-35000,-35000],color=TEXT,linewidth=2,zorder=6)
inset.text(-30000,-32000,'20 km',fontsize=9,ha='center',zorder=6)
fig.add_artist(ConnectionPatch(xyA=(limit[1],limit[3]),xyB=(0,.25),coordsA=GEO._as_mpl_transform(ax),coordsB=inset.transAxes,color=GOLD,linewidth=.7,linestyle='--'))
legend(fig, outside=True);save(fig,'10_peru_carancas.png')
print('Cinco figuras regeneradas; tamaños de muestra verificados.')
