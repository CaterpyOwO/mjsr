clang ./src/*.c --target=wasm32-unknown-unknown-wasm --optimize=3 -nostdlib -Wl,--export-all -Wl,--no-entry -Wl,--allow-undefined --output ./lib.wasm
