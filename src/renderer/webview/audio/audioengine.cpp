#include "audioengine.hpp"

class AudioEngine::Impl : public juce::AudioIODeviceCallback {
public:
    Impl() {
        deviceManager.initialiseWithDefaultDevices(2, 2);
        deviceManager.addAudioCallback(this);
    }

    ~Impl() {
        deviceManager.removeAudioCallback(this);
    }

    void audioDeviceIOCallback(const float** inputChannelData,
                             int numInputChannels,
                             float** outputChannelData,
                             int numOutputChannels,
                             int numSamples) override {
        // Clear output buffers
        for (int channel = 0; channel < numOutputChannels; ++channel) {
            if (outputChannelData[channel] != nullptr) {
                std::memset(outputChannelData[channel], 0, sizeof(float) * numSamples);
            }
        }
    }

    void audioDeviceAboutToStart(juce::AudioIODevice* device) override {}
    void audioDeviceStopped() override {}

private:
    juce::AudioDeviceManager deviceManager;
};

AudioEngine::AudioEngine() : impl(std::make_unique<Impl>()) {}
AudioEngine::~AudioEngine() = default;

void AudioEngine::initialize() {
    // Additional initialization if needed
}

void AudioEngine::shutdown() {
    // Additional cleanup if needed
}
