@echo off

echo Compiling...
clang src/*.c -fvisibility=hidden --target=wasm32-unknown-unknown-wasm --optimize=3 -nostdlib -Wl,--no-entry -Wl,--allow-undefined -Wl,--export-dynamic --output ./lib.wasm

echo Optimizing...
wasm-opt -Oz lib.wasm -o lib.wasm

echo Done.
