module.exports = {
    machineConfigInformations(
        machine_name,
        public_ip,
        machine_number_of_cores,
        machine_memory_size,
        programs,
        ports,
        vars
    ) {
        console.log('\n  @@@@@@ VIRTUAL MACHINE CONFIGURATIONS');
        console.log(`  @@ Machine name: ${machine_name}`);
        console.log(`  @@ IP: ${public_ip}`);
        console.log(`  @@ SSH Port: 22${public_ip.split('.')[3]}`);
        console.log(`  @@ Number of Cores: ${machine_number_of_cores}`);
        console.log(`  @@ Memory: ${machine_memory_size} Mb`);
        console.log(`  @@ Install Programs: ${programs}`);
        console.log(`  @@ Ports Available: ${ports}`);
        console.log(`  @@ User: ${vars[0]}`);
        console.log(`  @@ Password: ${vars[1]}`);
        console.log(`  @@ Has the public SSH key been copied? ${vars[2][0]}\n`);
    },

    ansibleAWXConfigInformations(machine_name, machine_number_of_cores, machine_memory_size, public_ip, vars) {
        console.log('\n  @@@@@@ ANSIBLE-AWX CONFIGURATIONS');
        console.log(`  @@ Machine name: ${machine_name}`);
        console.log(`  @@ IP: ${public_ip}`);
        console.log(`  @@ Number of Cores: ${machine_number_of_cores}`);
        console.log(`  @@ Memory: ${machine_memory_size} Mb`);
        console.log(`  @@ User: ${vars[0]}`);
        console.log(`  @@ Password: ${vars[1]}\n`);
    },
};
