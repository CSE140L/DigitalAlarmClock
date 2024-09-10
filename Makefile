.PHONY: clean wasm build

CONTAINER ?= anishg24/cse140l:latest

build:
	podman run -it --rm -v $(PWD):/src $(CONTAINER) make wasm

# These targets are meant to be run in the build container!

TOP_LEVEL_DESIGN	?= DigitalAlarm
VERILATOR_ROOT		 = /tools/verilator
VERILATOR_EXE			 = $(VERILATOR_ROOT)/bin/verilator
EMMAKE             = emmake
EMCXX 				 		 = em++

OUTPUT_DIR			 	 = ./simulator/scripts/wasm

wasm: $(OUTPUT_DIR)

obj_dir: verilog/
	$(VERILATOR_EXE) --cc ./verilog/*.v ./config.vlt
	$(EMMAKE) make -C obj_dir -f V$(TOP_LEVEL_DESIGN).mk

$(OUTPUT_DIR): obj_dir models/wasm.cpp
	mkdir -p $(OUTPUT_DIR)
	$(EMCXX) -O3 -Iobj_dir -I$(VERILATOR_ROOT)/include models/wasm.cpp obj_dir/*.o -o "$(OUTPUT_DIR)/$(TOP_LEVEL_DESIGN).js"

clean:
	$(RM) -r obj_dir $(OUTPUT_DIR)
