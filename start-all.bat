@echo off
title Menjalankan AgroForge (Fullstack)
echo ===================================================
echo   Memulai AgroForge Backend & Frontend...
echo ===================================================

echo [1/2] Menjalankan Backend di port 5000...
start "AgroForge Backend (Port 5000)" cmd /k "cd /d "%~dp0backend" && npm start"

echo [2/2] Menjalankan Frontend Vite di port 5173...
start "AgroForge Frontend (Vite)" cmd /k "cd /d "%~dp0" && npm run dev"

echo ===================================================
echo   Backend  : http://localhost:5000
echo   Frontend : http://localhost:5173
echo ===================================================
