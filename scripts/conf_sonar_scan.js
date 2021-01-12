var options = {};
var sonar = {};

sonar.sources = 'src';
sonar.java_binaries = 'target/classes';
sonar.projectBaseDir = '../';
sonar.sourceEncoding = 'UTF-8';
sonar.dependencyCheck_htmlReportPath = 'target/dependency-check-report.html';

options.sonar = sonar;

module.exports = options;