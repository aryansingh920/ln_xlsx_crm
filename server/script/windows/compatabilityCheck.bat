@echo off
:: Check for Node.js
where node > nul 2>&1
if %errorlevel%==0 (
    echo Node.js is installed on your system.
) else (
    echo Node.js is not installed on your system.
)

:: Check for Python
where python > nul 2>&1
if %errorlevel%==0 (
    echo Python is installed on your system.
) else (
    echo Python is not installed on your system.
)
