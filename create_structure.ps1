# Create directories
$dirs = @(
    "entities",
    "src/api",
    "src/components/ugp",
    "src/components/ui",
    "src/hooks",
    "src/lib",
    "src/pages",
    "src/utils"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

# Create empty files
$files = @(
    "entities/ModuleProgress",
    "entities/ProjectChecklistProgress",
    "entities/ProjectSubmission",
    "src/api/base44Client.js",
    "src/components/AuthLayout.jsx",
    "src/components/GoogleIcon.jsx",
    "src/components/ProtectedRoute.jsx",
    "src/components/ScrollToTop.jsx",
    "src/components/UserNotRegisteredError.jsx",
    "src/hooks/use-mobile.jsx",
    "src/lib/app-params.js",
    "src/lib/AuthContext.jsx",
    "src/lib/PageNotFound.jsx",
    "src/lib/query-client.js",
    "src/lib/ugpContent.js",
    "src/lib/utils.js",
    "src/pages/ContentPage.jsx",
    "src/pages/ForgotPassword.jsx",
    "src/pages/Gate.jsx",
    "src/pages/Home.jsx",
    "src/pages/Landing.jsx",
    "src/pages/Login.jsx",
    "src/pages/ProjectDetail.jsx",
    "src/pages/Register.jsx",
    "src/pages/ResetPassword.jsx",
    "src/utils/index.ts",
    "src/App.jsx",
    "src/index.css",
    "src/main.jsx",
    ".gitignore",
    "AGENTS.md",
    "CLAUDE.md",
    "components.json",
    "eslint.config.js",
    "index.html",
    "jsconfig.json",
    "package.json",
    "postcss.config.js",
    "README.md",
    "tailwind.config.js",
    "vite.config.js"
)

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        New-Item -ItemType File -Path $file -Force | Out-Null
    }
}
