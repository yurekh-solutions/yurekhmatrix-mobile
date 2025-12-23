@echo off
echo ====================================
echo Switching to LOCAL Backend
echo ====================================
echo.

REM Backup current .env
copy .env .env.backup >nul 2>&1

REM Update .env to use localhost
(
echo # Backend API URL Configuration
echo # ================================
echo.
echo # LOCAL DEVELOPMENT ^(Active^)
echo EXPO_PUBLIC_API_URL=http://localhost:5000/api
echo.
echo # PRODUCTION ^(Commented out^)
echo # EXPO_PUBLIC_API_URL=https://backendmatrix.onrender.com/api
echo.
echo # ================================
echo # Restart Expo: npx expo start --clear
) > .env

echo ✅ Switched to LOCAL backend (http://localhost:5000/api)
echo.
echo 📝 Next steps:
echo    1. Start backend: cd ..\backendmatrix ^&^& npm run dev
echo    2. Restart Expo: npx expo start --clear
echo.
pause
