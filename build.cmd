@echo off
setlocal enabledelayedexpansion

:: Create build directory if it doesn't exist
if not exist "build" mkdir build

:: Navigate to build directory
cd build

:: Configure with CMake
echo Configuring CMake...
cmake -G "Visual Studio 17 2022" -A x64 ..
if errorlevel 1 (
    echo CMake configuration failed
    exit /b 1
)

:: Build the project
echo Building project...
cmake --build . --config Release
if errorlevel 1 (
    echo Build failed
    exit /b 1
)

echo Build completed successfully!
cd ..

endlocal
