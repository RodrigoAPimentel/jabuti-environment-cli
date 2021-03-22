const PORTS = [
    'Mysql(3306:3306)',
    'Mongo(27017:27017)',
    'Redis(6379:6379)',
    'Redis-Workbench(8001:8001)',
    'Jenkins(8080:8080)',
    'Nexus(8081:8081)',
    'SonarQube(9000:9000)',
    'Other',
    // "OpenShift-console(8443:8443)",
];

module.exports = PORTS;
