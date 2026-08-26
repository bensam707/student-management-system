@echo off
setlocal EnableDelayedExpansion

REM ── Maven Wrapper for Windows ──────────────────────────────────────────────
REM Invokes maven-wrapper.jar which downloads Apache Maven 3.9.6 on first run.
REM All subsequent runs use the cached Maven installation.

REM Change to the script's directory so relative paths work correctly
pushd "%~dp0"

REM Determine JAVA_CMD
SET "JAVA_CMD=java"
IF NOT "%JAVA_HOME%"=="" SET "JAVA_CMD=%JAVA_HOME%\bin\java"

REM Pass arguments through the wrapper JAR.
REM Using a relative path for -cp avoids quoting issues with spaces in paths.
"%JAVA_CMD%" -cp ".mvn\wrapper\maven-wrapper.jar" "-Dmaven.multiModuleProjectDirectory=%CD%" org.apache.maven.wrapper.MavenWrapperMain %*

SET MVNW_EXIT=%ERRORLEVEL%
popd
EXIT /B %MVNW_EXIT%
