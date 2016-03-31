@echo.
@echo watchify %1 -o %2 -t [ babelify --presets es2015,react ] -d -v
@watchify %1 -o %2 -t [ babelify --presets es2015,react ] -d -v