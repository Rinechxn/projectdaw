#include <windows.h>
#include <wrl.h>
#include <wil/com.h>
#include <WebView2.h>
#include <string>

using namespace Microsoft::WRL;

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam);
void CreateMenuBar(HWND hwnd);

// WebView2 Environment and Controller
static ComPtr<ICoreWebView2Environment> webViewEnvironment;
static ComPtr<ICoreWebView2Controller> webViewController;
static ComPtr<ICoreWebView2> webView;

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR pCmdLine, int nCmdShow) {
    const wchar_t CLASS_NAME[] = L"HTAudioEditor";
    
    WNDCLASS wc = {};
    wc.lpfnWndProc = WindowProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME;
    RegisterClass(&wc);

    HWND hwnd = CreateWindowEx(
        0,
        CLASS_NAME,
        L"HT Audio Editor",
        WS_OVERLAPPEDWINDOW,
        CW_USEDEFAULT, CW_USEDEFAULT, 1200, 800,
        NULL,
        NULL,
        hInstance,
        NULL
    );

    CreateMenuBar(hwnd);
    ShowWindow(hwnd, nCmdShow);

    // Initialize WebView2
    CreateCoreWebView2EnvironmentWithOptions(nullptr, nullptr, nullptr,
        Callback<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler>(
            [hwnd](HRESULT result, ICoreWebView2Environment* env) -> HRESULT {
                webViewEnvironment = env;
                env->CreateCoreWebView2Controller(hwnd,
                    Callback<ICoreWebView2CreateCoreWebView2ControllerCompletedHandler>(
                        [hwnd](HRESULT result, ICoreWebView2Controller* controller) -> HRESULT {
                            webViewController = controller;
                            webViewController->get_CoreWebView2(&webView);

                            // Initialize WebView settings
                            webView->get_Settings(&settings);
                            settings->put_IsScriptEnabled(TRUE);
                            settings->put_AreDefaultContextMenusEnabled(FALSE);

                            // Navigate to app
                            webView->Navigate(L"http://localhost:3000");
                            return S_OK;
                        }).Get());
                return S_OK;
            }).Get());

    MSG msg = {};
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return 0;
}

void CreateMenuBar(HWND hwnd) {
    HMENU hMenu = CreateMenu();
    
    // File Menu
    HMENU hFileMenu = CreatePopupMenu();
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_NEW, L"&New Project\tCtrl+N");
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_NEW_TEMPLATE, L"New Project &Template\tCtrl+Shift+N");
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_OPEN, L"&Open Project\tCtrl+O");
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_SAVE, L"&Save Project\tCtrl+S");
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_SAVE_AS, L"Save &As\tCtrl+Shift+S");
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_SAVE_VERSION, L"Save New &Version\tCtrl+Alt+S");
    AppendMenu(hFileMenu, MF_SEPARATOR, 0, NULL);
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_IMPORT, L"&Import Data\tCtrl+M");
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_EXPORT, L"&Export Data\tCtrl+Shift+M");
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_EXPORT_AUDIO, L"Export &Audio\tCtrl+R");
    AppendMenu(hFileMenu, MF_SEPARATOR, 0, NULL);
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_PREFERENCES, L"&Preferences\tCtrl+.");
    AppendMenu(hFileMenu, MF_SEPARATOR, 0, NULL);
    AppendMenu(hFileMenu, MF_STRING, ID_FILE_EXIT, L"E&xit\tAlt+F4");
    AppendMenu(hMenu, MF_POPUP, (UINT_PTR)hFileMenu, L"&File");

    // Edit Menu
    HMENU hEditMenu = CreatePopupMenu();
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_CUT, L"Cu&t\tCtrl+X");
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_COPY, L"&Copy\tCtrl+C");
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_PASTE, L"&Paste\tCtrl+V");
    AppendMenu(hEditMenu, MF_SEPARATOR, 0, NULL);
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_DUPLICATE_CLIP, L"&Duplicate Clip\tCtrl+D");
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_DUPLICATE_TRACK, L"Duplicate &Track\tCtrl+Shift+D");
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_REMOVE_TRACK, L"&Remove Track\tShift+Del");
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_ADD_TRACK, L"Add &Track\tT");
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_RENAME, L"Rena&me\tF2");
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_SPLIT, L"&Split\tB");
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_RIPPLE_TRIM_PREV, L"Ripple Trim &Previous\tQ");
    AppendMenu(hEditMenu, MF_STRING, ID_EDIT_RIPPLE_TRIM_NEXT, L"Ripple Trim &Next\tW");
    AppendMenu(hMenu, MF_POPUP, (UINT_PTR)hEditMenu, L"&Edit");

    // Project Menu
    HMENU hProjectMenu = CreatePopupMenu();
    AppendMenu(hProjectMenu, MF_STRING, ID_PROJECT_SETTINGS, L"Project &Settings");
    AppendMenu(hProjectMenu, MF_STRING, ID_PROJECT_AUTOMATION, L"&Automation View");
    AppendMenu(hProjectMenu, MF_STRING, ID_PROJECT_AUTO_COLOR, L"Auto &Color");
    AppendMenu(hProjectMenu, MF_STRING, ID_PROJECT_REMOVE_UNUSED, L"Remove &Unused Track");
    AppendMenu(hProjectMenu, MF_STRING, ID_PROJECT_MARKER, L"&Marker");
    AppendMenu(hProjectMenu, MF_STRING, ID_PROJECT_XML_EDITOR, L"&XML Data Editor");
    AppendMenu(hProjectMenu, MF_STRING, ID_PROJECT_COPY_TO_FOLDER, L"Copy data to Project &folder");
    AppendMenu(hMenu, MF_POPUP, (UINT_PTR)hProjectMenu, L"&Project");

    // Audio Menu
    HMENU hAudioMenu = CreatePopupMenu();
    AppendMenu(hAudioMenu, MF_STRING, ID_AUDIO_PROCESSOR, L"&Processor");
    AppendMenu(hAudioMenu, MF_STRING, ID_AUDIO_FADES, L"&Fades");
    AppendMenu(hAudioMenu, MF_STRING, ID_AUDIO_LATENCY_CALC, L"&Latency Calculator");
    AppendMenu(hAudioMenu, MF_STRING, ID_AUDIO_ZERO_LATENCY, L"Force &Zero Latency");
    AppendMenu(hAudioMenu, MF_STRING, ID_AUDIO_FREEZE_TRACKS, L"&Freeze Tracks");
    AppendMenu(hAudioMenu, MF_STRING, ID_AUDIO_CLIP_TO_SAMPLER, L"Selected Clip to &Sampler");
    AppendMenu(hAudioMenu, MF_STRING, ID_AUDIO_PREFERENCES, L"Audio Editor &Preferences");
    AppendMenu(hMenu, MF_POPUP, (UINT_PTR)hAudioMenu, L"&Audio");

    // Window Menu
    HMENU hWindowMenu = CreatePopupMenu();
    AppendMenu(hWindowMenu, MF_STRING, ID_WINDOW_MIXER, L"&Mixer\tF3");
    AppendMenu(hWindowMenu, MF_STRING, ID_WINDOW_TIMELINE, L"&Timeline\tF5");
    AppendMenu(hWindowMenu, MF_STRING, ID_WINDOW_EDITOR, L"&Editor\tF4");
    AppendMenu(hWindowMenu, MF_STRING, ID_WINDOW_AUDIO_MANAGER, L"&Audio Manager");
    AppendMenu(hWindowMenu, MF_STRING, ID_WINDOW_PLUGIN_MANAGER, L"&Plugin Manager");
    AppendMenu(hMenu, MF_POPUP, (UINT_PTR)hWindowMenu, L"&Window");

    // Tools Menu
    HMENU hToolsMenu = CreatePopupMenu();
    AppendMenu(hToolsMenu, MF_STRING, ID_TOOLS_COMMAND_PALETTE, L"&Command Palette\tCtrl+Shift+P");
    AppendMenu(hToolsMenu, MF_STRING, ID_TOOLS_KEYBOARD_CURSOR, L"Enable &Keyboard Cursor Editing\tAlt+C");
    AppendMenu(hToolsMenu, MF_STRING, ID_TOOLS_STEM_EXTRACTOR, L"&Stem Extractor");
    AppendMenu(hToolsMenu, MF_STRING, ID_TOOLS_DISCORD_RPC, L"&Discord RPC");
    AppendMenu(hMenu, MF_POPUP, (UINT_PTR)hToolsMenu, L"&Tools");

    // Help Menu
    HMENU hHelpMenu = CreatePopupMenu();
    AppendMenu(hHelpMenu, MF_STRING, ID_HELP_DOCUMENTATION, L"&Help/Documentation\tF1");
    AppendMenu(hHelpMenu, MF_STRING, ID_HELP_ABOUT, L"&About");
    AppendMenu(hHelpMenu, MF_STRING, ID_HELP_GITHUB, L"&GitHub Repository");
    AppendMenu(hMenu, MF_POPUP, (UINT_PTR)hHelpMenu, L"&Help");

    SetMenu(hwnd, hMenu);
}

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    switch (uMsg) {
        case WM_DESTROY:
            PostQuitMessage(0);
            return 0;

        case WM_SIZE:
            if (webViewController) {
                RECT bounds;
                GetClientRect(hwnd, &bounds);
                webViewController->put_Bounds(bounds);
            }
            return 0;

        case WM_COMMAND:
            switch (LOWORD(wParam)) {
                // File Menu
                case ID_FILE_NEW:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-new-project'))");
                    break;
                case ID_FILE_NEW_TEMPLATE:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-new-project-template'))");
                    break;
                case ID_FILE_OPEN:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-open-project'))");
                    break;
                case ID_FILE_SAVE:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-save-project'))");
                    break;
                case ID_FILE_SAVE_AS:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-save-as'))");
                    break;
                case ID_FILE_SAVE_VERSION:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-save-new-version'))");
                    break;
                case ID_FILE_IMPORT:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-import-data'))");
                    break;
                case ID_FILE_EXPORT:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-export-data'))");
                    break;
                case ID_FILE_EXPORT_AUDIO:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-export-audio'))");
                    break;
                case ID_FILE_PREFERENCES:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-preferences'))");
                    break;
                case ID_FILE_EXIT:
                    PostQuitMessage(0);
                    break;

                // Edit Menu
                case ID_EDIT_DUPLICATE_CLIP:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-duplicate-clip'))");
                    break;
                case ID_EDIT_DUPLICATE_TRACK:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-duplicate-track'))");
                    break;
                case ID_EDIT_REMOVE_TRACK:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-remove-track'))");
                    break;
                case ID_EDIT_ADD_TRACK:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-add-track'))");
                    break;
                case ID_EDIT_RENAME:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-rename'))");
                    break;
                case ID_EDIT_SPLIT:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-split'))");
                    break;
                case ID_EDIT_RIPPLE_TRIM_PREV:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-ripple-trim-previous'))");
                    break;
                case ID_EDIT_RIPPLE_TRIM_NEXT:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-ripple-trim-next'))");
                    break;

                // Project Menu
                case ID_PROJECT_SETTINGS:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-project-setting'))");
                    break;
                case ID_PROJECT_AUTOMATION:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-automation-view'))");
                    break;
                case ID_PROJECT_AUTO_COLOR:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-auto-color'))");
                    break;
                case ID_PROJECT_REMOVE_UNUSED:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-remove-unused-track'))");
                    break;
                case ID_PROJECT_MARKER:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-marker'))");
                    break;
                case ID_PROJECT_XML_EDITOR:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-xml-editor'))");
                    break;
                case ID_PROJECT_COPY_TO_FOLDER:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-copy-to-project-folder'))");
                    break;

                // Audio Menu
                case ID_AUDIO_PROCESSOR:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-processor'))");
                    break;
                case ID_AUDIO_FADES:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-fades'))");
                    break;
                case ID_AUDIO_LATENCY_CALC:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-latency-calculator'))");
                    break;
                case ID_AUDIO_ZERO_LATENCY:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-force-zero-latency'))");
                    break;
                case ID_AUDIO_FREEZE_TRACKS:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-freeze-tracks'))");
                    break;
                case ID_AUDIO_CLIP_TO_SAMPLER:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-clip-to-sampler'))");
                    break;
                case ID_AUDIO_PREFERENCES:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-audio-editor-preferences'))");
                    break;

                // Window Menu
                case ID_WINDOW_MIXER:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-mixer'))");
                    break;
                case ID_WINDOW_TIMELINE:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-timeline'))");
                    break;
                case ID_WINDOW_EDITOR:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-editor'))");
                    break;
                case ID_WINDOW_AUDIO_MANAGER:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-audio-manager'))");
                    break;
                case ID_WINDOW_PLUGIN_MANAGER:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-plugin-manager'))");
                    break;

                // Tools Menu
                case ID_TOOLS_COMMAND_PALETTE:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-command-palette'))");
                    break;
                case ID_TOOLS_KEYBOARD_CURSOR:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-keyboard-cursor-editing'))");
                    break;
                case ID_TOOLS_STEM_EXTRACTOR:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-stem-extractor'))");
                    break;
                case ID_TOOLS_DISCORD_RPC:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-discord-rpc'))");
                    break;

                // Help Menu
                case ID_HELP_DOCUMENTATION:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-help'))");
                    break;
                case ID_HELP_ABOUT:
                    webView->ExecuteScript(L"window.dispatchEvent(new CustomEvent('menu-about'))");
                    break;
                case ID_HELP_GITHUB:
                    ShellExecute(NULL, L"open", L"https://github.com/yourusername/yourrepo", NULL, NULL, SW_SHOWNORMAL);
                    break;
            }
            return 0;
    }
    return DefWindowProc(hwnd, uMsg, wParam, lParam);
}
