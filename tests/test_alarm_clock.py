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
    assert dut.s1 == 10, "Alarm clock is not at 10 seconds after 10 clock cycles"


@cocotb.test()
async def pass_15_seconds(dut):
    for cycle in range(15):
        dut.CLK.value = 0
        await Timer(1, units="ns")
        dut.CLK.value = 1
        await Timer(1, units="ns")

    dut._log.info("s1 is %s", dut.s1)
    assert dut.s1 == 15, "Alarm clock is not at 5 seconds after 5 clock cycles"


@cocotb.test()
async def pass_one_minute(dut):
    for cycle in range(61):
        dut.CLK.value = 0
        await Timer(1, units="ns")
        dut.CLK.value = 1
        await Timer(1, units="ns")

    dut._log.info("s2 is %s", dut.s2)
    assert dut.s2 == 1, "Alarm clock is not whatever >:("
