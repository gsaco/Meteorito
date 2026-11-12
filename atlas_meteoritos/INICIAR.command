#!/bin/zsh -l
set -e
cd -- "$(dirname -- "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo "Para abrir Meteoritos, instala Node.js 22.12 o posterior y vuelve a ejecutar este archivo."
  exit 1
fi

if [[ ! -d node_modules ]]; then
  npm ci
fi

echo "Abriendo Meteoritos. Mantén esta ventana abierta mientras uses el atlas."
npm run dev -- --open
