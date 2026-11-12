"""Convierte la base auditada, conservando ceros, ausencias y coordenadas originales.

Ejecutar desde cualquier directorio: python3 scripts/preparar_datos.py
No descarga, corrige ni imputa observaciones.
"""
import csv
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def number(value, integer=False):
    if value == "":
        return None
    return int(float(value)) if integer else float(value)


def main():
    with (ROOT / "public/datos/meteoritos_preparados.csv").open(encoding="utf-8-sig") as file:
        rows = list(csv.DictReader(file))
    records = []
    for row in rows:
        terrestrial = row["es_terrestre"] == "True"
        records.append({
            "id": int(row["id"]), "name": row["name"], "class": row["class"],
            "mass": number(row["mass"]), "fall": row["fall"],
            "year": number(row["anio"], integer=True), "rawYear": row["year"],
            "lat": number(row["lat"]), "lon": number(row["long"]),
            "terrestrial": terrestrial,
            "mappable": terrestrial and row["coordenadas_utilizables"] == "True",
            "coordinateStatus": row["estado_coordenadas"],
        })
    earth = [r for r in records if r["terrestrial"]]
    mapped = [r for r in records if r["mappable"]]
    years = [r["year"] for r in earth if r["year"] is not None]
    metadata = {
        "total": len(records), "terrestrial": len(earth), "mappable": len(mapped),
        "minYear": min(years), "maxYear": max(years),
        "polar": sum(abs(r["lat"]) > 85.051129 for r in mapped),
        "fallCounts": dict(Counter(r["fall"] for r in earth)),
        "source": "NASA Meteorite Landings / The Meteoritical Society",
        "note": "Copia histórica del catálogo entregado para la tarea; no es un servicio en tiempo real.",
    }
    destination = ROOT / "public/datos/meteoritos.json"
    destination.write_text(json.dumps({"metadata": metadata, "records": records},
                                     ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{len(records):,} registros; {len(mapped):,} coordenadas terrestres utilizables.")


if __name__ == "__main__":
    main()
