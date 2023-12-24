@echo off

:: Run the check_node_python.sh script
@REM ./compatabilityCheck.bat

:: Specify the destination path for the .env file
set "DESTINATION_PATH=..\..\env.bat"

echo Node Server of Canverro-Backend
:: Get the PID listening on port
set "port=3000"
for /f "tokens=2" %%i in ('netstat -a -n -o ^| findstr ":%port%" ^| findstr "LISTENING"') do set "pid=%%i"

:: If PID exists, kill the process
if not "%pid%"=="" (
  echo Killing process with PID %pid%
  taskkill /F /PID %pid%
) else (
  echo No process listening on port %port%
)

echo Installing Python dependencies...
pip install -r ..\requirements.txt

echo Setting environment variables...
set "PORT=%port%"
set "OPENAI_API_KEY="
set "BARD_1PSID_cookie_value="
set "BARD_1PSIDTS_cookie_value="
set "BARD_1PSIDCC_cookie_value="
set "RAPID_API_KEY_VALUE=4749eed77fmsh282e13aab241c01p1c733djsn8a439686b347"
set "ZERO_BOUNCE_API_KEY_VALUE="

:: Create the .env file
echo PORT=%PORT% > "%DESTINATION_PATH%"
echo OPENAI_API_KEY=%OPENAI_API_KEY% >> "%DESTINATION_PATH%"
echo BARD_1PSID_cookie_value=%BARD_1PSID_cookie_value% >> "%DESTINATION_PATH%"
echo BARD_1PSIDTS_cookie_value=%BARD_1PSIDTS_cookie_value% >> "%DESTINATION_PATH%"
echo BARD_1PSIDCC_cookie_value=%BARD_1PSIDCC_cookie_value% >> "%DESTINATION_PATH%"
echo RAPID_API_KEY_VALUE=%RAPID_API_KEY_VALUE% >> "%DESTINATION_PATH%"
echo ZERO_BOUNCE_API_KEY_VALUE=%ZERO_BOUNCE_API_KEY_VALUE% >> "%DESTINATION_PATH%"
@REM print current directory
echo Starting server...
echo Node Version
node -v
echo NPM Version
npm -v
@REM print current directory
:: Install dependencies
rmdir /s /q node_modules

if exist package-lock.json (
  npm ci
) else (
  npm i
)

@REM print current directory
echo Current directory: %CD%
npm ls
echo Compiling SCSS to CSS...
@REM ./sass.bat
npm start
npm test
