@echo off
echo Starting Madrasa ERP Application...
echo.

echo Installing server dependencies...
cd server
call npm install
echo.

echo Installing client dependencies...
cd ..\client
call npm install
echo.

echo Starting server on port 3001...
start "Madrasa ERP Server" cmd /k "cd ..\server && npm run dev"
timeout /t 3 /nobreak > nul

echo Starting client on port 5173...
start "Madrasa ERP Client" cmd /k "cd client && npm run dev"
echo.

echo Both server and client are starting...
echo Server: http://localhost:3001
echo Client: http://localhost:5173
echo.
pause






