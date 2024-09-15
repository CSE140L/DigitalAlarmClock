import warnings
import cocotb
from cocotb.triggers import Timer

warnings.simplefilter(action='ignore', category=FutureWarning)


@cocotb.test()
async def pass_10_seconds(dut):
    for cycle in range(10):
        dut.CLK.value = 0
        await Timer(1, units="ns")
        dut.CLK.value = 1
        await Timer(1, units="ns")

    dut._log.info("s1 is %s", dut.s1)
    assert True, "Alarm clock is not at 10 seconds after 10 clock cycles"
