from os import getenv
from pathlib import Path
from cocotb.runner import get_runner
from pytest_utils.decorators import max_score, visibility, partial_credit

SIM = "verilator"
PROJECT_DIR = Path(__file__).resolve().parent.parent
SOURCES = list(Path(PROJECT_DIR, "verilog").glob("*.v*"))
TOP_LEVEL_DESIGN = getenv("TOPLEVEL")

runner = get_runner(SIM)
runner.build(sources=SOURCES, hdl_toplevel=TOP_LEVEL_DESIGN)


@max_score(10)
@visibility("hidden")
@partial_credit()
def test_alarm_clock(set_score=None):
    runner.test(hdl_toplevel=TOP_LEVEL_DESIGN, test_module="test_alarm_clock,", testcase="pass_10_seconds")
    set_score(5)
    runner.test(hdl_toplevel=TOP_LEVEL_DESIGN, test_module="test_alarm_clock,", testcase="pass_15_seconds")
    set_score(7)
    runner.test(hdl_toplevel=TOP_LEVEL_DESIGN, test_module="test_alarm_clock,", testcase="pass_one_minute")
    set_score(10)


@max_score(10)
@partial_credit()
def test_seven_segment_display(set_score=None):
    runner.test(hdl_toplevel=TOP_LEVEL_DESIGN, test_module="test_seven_segment")
    set_score(10)
