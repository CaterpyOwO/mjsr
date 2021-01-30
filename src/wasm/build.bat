@echo off

echo Compiling...
clang src/*.c -fvisibility=hidden --target=wasm32-unknown-unknown-wasm --optimize=3 -nostdlib -Wl,--lto-O3,--no-entry,-O3,--allow-undefined,--export-dynamic,--import-memory --output ./lib.wasm

echo Optimizing...
wasm-opt -Oz lib.wasm -o lib.wasm

echo Done.
