describe("Angle", function() {

  var angle;

  beforeEach(function() {
    angle = new Angle();
  });

  it("return 0 for radians and degrees when initialized empty", function() {
    expect(angle.radians).toEqual(0);
    expect(angle.degrees).toEqual(0);
  });

  it("returns normalized value for degrees when >360 or <0", function() {
    angle.degrees = 370;
    expect(angle.degrees).toEqual(10);

    angle.degrees = -20;
    expect(angle.degrees).toEqual(340);
  });

  it("properly adds other angles on", function() {
    angle.degrees = 35;
    a2 = new Angle();
    a2.degrees = 45;
    angle.add(a2);
    expect(angle.degrees).toEqual(80);
  });

  it("properly subtracts other angles", function() {
    angle.degrees = 35;
    a2 = new Angle();
    a2.degrees = 25;
    angle.subtract(a2);
    expect(angle.degrees).toEqual(10);
  });

  it("returns proper values for trig fuctions", function() {
    angle.degrees = 30;
    expect(angle.sin()).toBeCloseTo(0.5);
    expect(angle.cos()).toBeCloseTo(0.866);
    expect(angle.tan()).toBeCloseTo(0.577);
  });

  it("converts between degrees and radians", function() {
    angle.degrees = 30;
    expect(angle.radians).toBeCloseTo(Math.PI / 6);

    angle.radians = Math.PI / 4;
    expect(angle.degrees).toBeCloseTo(45);

    angle.degrees = 350;
    expect(angle.radians).toBeCloseTo(6.109);
  });


  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrowError("song is already playing");
  //   });
  // });
});