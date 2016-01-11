var lineReader = require('line-reader');

lineReader.open('file.txt', function(err, reader) {
  if (err) throw err;
  if (reader.hasNextLine()) {
    reader.nextLine(function(err, line) {
      try {
        if (err) throw err;

        console.log(line);
        
      } finally {
        reader.close(function(err) {
          if (err) throw err;          
        });
      }
    });
  }
  else {
    reader.close(function(err) {
      if (err) throw err;          
    });
  }
});