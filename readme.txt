powershell $env:Path += ";C:\MinGW\bin"


g++ -std=c++11 -mwindows -static localhost.cpp -o dns.exe -static-libgcc -static-libstdc++