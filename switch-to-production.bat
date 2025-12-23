@echo off
echo ====================================
echo Switching to PRODUCTION Backend
echo ====================================
echo.

REM Backup current .env
copy .env .env.backup >nul 2>&1

REM Update .env to use production
(
echo # Backend API URL Configuration
echo # ================================
echo.
echo # PRODUCTION ^(Active^)
echo EXPO_PUBLIC_API_URL=https://backendmatrix.onrender.com/api
echo.
echo # LOCAL DEVELOPMENT ^(Commented out^)
echo # EXPO_PUBLIC_API_URL=http://localhost:5000/api
echo.
echo # ================================
echo # Restart Expo: npx expo start --clear
) > .env

echo ✅ Switched to PRODUCTION backend (https://backendmatrix.onrender.com/api)
echo.
echo 📝 Next steps:
echo    Restart Expo: npx expo start --clear
echo.
pause
