window.level9 = {
    name: "level9",
    load: function() {
        this.level = new PIXI.Container();

        this.collisionSurfaces = [];

        this.spikeSurfaces = [];

        this.adj = [];
        this.level.adj = this.adj;

        this.loaded = true;

        return this;
    },
    tick: function() {
        characters[parNum].victory = true;
        characters[parNum].char.alpha = 0;
        characters[parNum].screen = 'level8';
        let won = true;
        let notWon = 0;
        let saved = 0;
        for(let i = 0, l = characters.length; i < l; ++i) {
            if(!characters[i].victory && !characters[i].dead) {
                won = false;
                notWon = i;
                break;
            } else if(characters[i].victory) {
                saved++;
            }
        }
        if(!won) {
            parNum = notWon;
        } else {
            stage.loadScreen = levels['youwin'];
            levels['youwin'].saved = saved;
            indicator.alpha = 0;
        }
    }
};
