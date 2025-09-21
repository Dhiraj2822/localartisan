@echo off
echo Cleaning up project...

REM Delete node_modules
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
)

REM Delete package-lock.json
if exist package-lock.json (
    echo Removing package-lock.json...
    del package-lock.json
)

REM Delete yarn.lock if exists
if exist yarn.lock (
    echo Removing yarn.lock...
    del yarn.lock
)

REM Clear npm cache
echo Clearing npm cache...
npm cache clean --force

REM Remove Vite cache
if exist .vite (
    echo Removing .vite cache...
    rmdir /s /q .vite
)

REM Remove dist folder
if exist dist (
    echo Removing dist folder...
    rmdir /s /q dist
)

echo Installing dependencies...
npm install

echo Setup complete! Run 'npm run dev' to start the development server.
pause