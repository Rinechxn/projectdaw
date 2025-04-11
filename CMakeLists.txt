# CMakeLists.txt

cmake_minimum_required(VERSION 3.15)

project(Futureboard)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add JUCE as a subdirectory (assuming you have it as a submodule)
add_subdirectory(external/JUCE)

# Add executable
add_executable(Futureboard
    src/renderer/webview/main.cpp
    src/renderer/webview/audio/audioengine.cpp
    src/renderer/webview/audio/audioengine.hpp
)

# Add FetchContent for NuGet
include(FetchContent)
FetchContent_Declare(
    nuget
    URL "https://dist.nuget.org/win-x86-commandline/latest/nuget.exe"
    DOWNLOAD_NO_EXTRACT TRUE
)
FetchContent_MakeAvailable(nuget)

# Download and install WebView2 and WIL using NuGet
set(NUGET_PACKAGES_DIR "${CMAKE_BINARY_DIR}/packages")
execute_process(
    COMMAND ${CMAKE_COMMAND} -E make_directory ${NUGET_PACKAGES_DIR}
)
execute_process(
    COMMAND ${nuget_SOURCE_DIR}/nuget.exe install Microsoft.Windows.ImplementationLibrary -OutputDirectory ${NUGET_PACKAGES_DIR}
    COMMAND ${nuget_SOURCE_DIR}/nuget.exe install Microsoft.Web.WebView2 -OutputDirectory ${NUGET_PACKAGES_DIR}
)

# Add WebView2 and WIL to include directories
target_include_directories(Futureboard
    PUBLIC
        ${CMAKE_CURRENT_SOURCE_DIR}/src
        ${NUGET_PACKAGES_DIR}/Microsoft.Windows.ImplementationLibrary.1.0.240122.1/include
        ${NUGET_PACKAGES_DIR}/Microsoft.Web.WebView2.1.0.2365.46/build/native/include
)

# Link WebView2
target_link_libraries(Futureboard
    PRIVATE
        juce::juce_core
        juce::juce_audio_basics
        juce::juce_audio_devices
        juce::juce_audio_formats
        juce::juce_audio_processors
        juce::juce_audio_utils
        "${NUGET_PACKAGES_DIR}/Microsoft.Web.WebView2.1.0.2365.46/build/native/x64/WebView2Loader.dll.lib"
)

# Add preprocessor definitions
target_compile_definitions(Futureboard
    PRIVATE
        JUCE_GLOBAL_MODULE_SETTINGS_INCLUDED=1
        JUCE_STANDALONE_APPLICATION=1
)

# Set JUCE options
set(JUCE_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(JUCE_BUILD_TESTING OFF CACHE BOOL "" FORCE)

# Set output directories
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)