#include <emscripten.h>
#include "VDigitalAlarm.h"

auto* controller = new VDigitalAlarm;

extern "C" {
    void EMSCRIPTEN_KEEPALIVE advance_clk() {
      controller->CLK = 0;
      controller->eval();
      controller->CLK = 1;
      controller->eval();
    }

    void EMSCRIPTEN_KEEPALIVE reset() {
      controller->CLR = 1;
      advance_clk();
      controller->CLR = 0;
      advance_clk();
    }
}
