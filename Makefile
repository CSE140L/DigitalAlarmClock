.PHONY: clean wasm build simulate _simulate

CONTAINER ?= anishg24/cse140l:latest
PORT ?= 8000

all: build

build:
	podman run -it --rm -v ./:/src $(CONTAINER) make wasm

simulate:
	podman run -it --rm -p $(PORT):$(PORT) -v ./:/src $(CONTAINER) make _simulate

clean:
	$(RM) -r obj_dir $(OUTPUT_DIR)

# These targets are meant to be run in the build container!

TOP_LEVEL_DESIGN ?= DigitalAlarm
VERILATOR_ROOT    = /tools/verilator
VERILATOR_EXE     = $(VERILATOR_ROOT)/bin/verilator
EMMAKE            = emmake
EMCXX             = em++

OUTPUT_DIR        = ./simulator/scripts/wasm

wasm: $(OUTPUT_DIR)/$(TOP_LEVEL_DESIGN).js

obj_dir: verilog/
	$(VERILATOR_EXE) --cc --public ./verilog/*.v ./config.vlt
	$(EMMAKE) make -C obj_dir -f V$(TOP_LEVEL_DESIGN).mk

$(OUTPUT_DIR)/$(TOP_LEVEL_DESIGN).js: obj_dir models/wasm.cpp
	mkdir -p $(OUTPUT_DIR)
	$(EMCXX) -O3 -Iobj_dir -I$(VERILATOR_ROOT)/include models/wasm.cpp obj_dir/*.o -o "$(OUTPUT_DIR)/$(TOP_LEVEL_DESIGN).js"

_simulate: wasm
	cd simulator && python3 -m http.server $(PORT)
