module.exports = {
    vagrantCLI({
        machine_name,
        public_ip,
        machine_number_of_cores,
        machine_memory_size,
        programs = [],
        ports = [],
        vars = [],
        vmTool = '',
    }) {
        const cli = `vagrant --machine-name=${machine_name} --external-ip=${public_ip} --cpu=${machine_number_of_cores} --memory=${machine_memory_size} --progrs=${programs} --ports=${ports} --vm-tool=${vmTool} --vars=${vars} up`;

        return cli;
    },
};
