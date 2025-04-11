#pragma once

#include <juce_audio_devices/juce_audio_devices.h>
#include <juce_audio_utils/juce_audio_utils.h>

class AudioEngine {
public:
    AudioEngine();
    ~AudioEngine();

    void initialize();
    void shutdown();

private:
    class Impl;
    std::unique_ptr<Impl> impl;
};
