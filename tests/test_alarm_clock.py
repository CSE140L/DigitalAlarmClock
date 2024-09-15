import cocotb
from cocotb.triggers import Timer


@cocotb.test()
async def my_first_test(dut):
    for cycle in range(10):
        dut.CLK.value = 0
        await Timer(1, units="ns")
        dut.CLK.value = 1
        await Timer(1, units="ns")

    dut._log.info("s1 is %s", dut.s1)
    assert dut.s1 == 1, "FAILED???"
