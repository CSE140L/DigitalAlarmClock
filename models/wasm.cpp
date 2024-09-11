#include <emscripten.h>
#include "VDigitalAlarm.h"
#include "VDigitalAlarm___024root.h"

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

    int EMSCRIPTEN_KEEPALIVE get_seven_segment_output(int digit) {
      switch (digit) {
        case 0:
          return controller->SEC_SEG_1;
        case 1:
          return controller->SEC_SEG_2;
        case 2:
          return controller->MIN_SEG_1;
        case 3:
          return controller->MIN_SEG_2;
        case 4:
          return controller->HR_SEG_1;
        case 5:
          return controller->HR_SEG_2;
        default:
          return 0; 
      }
    }

    void EMSCRIPTEN_KEEPALIVE enable_setup() {
      controller->SET = 1;
      advance_clk();
    }

    void EMSCRIPTEN_KEEPALIVE disable_setup() {
      controller->SET = 0;
      advance_clk();
    }

    void EMSCRIPTEN_KEEPALIVE increment() {
      controller->INC = 1;
      advance_clk();
      controller->INC = 0;
      advance_clk();
    }

    int EMSCRIPTEN_KEEPALIVE get_counter_val(int counter) {
      switch (counter) {
        case 0:
          return controller->rootp->DigitalAlarm__DOT__s1;
        case 1:
          return controller->rootp->DigitalAlarm__DOT__s2;
        case 2:
          return controller->rootp->DigitalAlarm__DOT__s3;
        default:
          return 0;
      }
    }
}
