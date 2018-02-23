request-batsh-compile -target winbat -src build.batsh > tmp.bat
tmp.bat

@rem type convert
@rem magick convert 0.png screenshot-0.jpg
@rem magick convert 1.png screenshot-1.jpg
@rem magick convert 2.png screenshot-2.jpg
@rem magick convert 3.png screenshot-3.jpg
@rem magick convert 4.png screenshot-4.jpg
@rem magick convert 5.png screenshot-5.jpg

@rem make thumbnail
@rem magick convert 0.png -resize "25%" thumbnail-0.jpg
@rem magick convert 1.png -resize "25%" thumbnail-1.jpg
@rem magick convert 2.png -resize "25%" thumbnail-2.jpg
@rem magick convert 3.png -resize "25%" thumbnail-3.jpg
@rem magick convert 4.png -resize "25%" thumbnail-4.jpg
@rem magick convert 5.png -resize "25%" thumbnail-5.jpg
