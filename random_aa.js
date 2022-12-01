class random{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    generate(colStartTrue){
        const matrix = [];
        const matsize = [this.x,this.y]
        let txt = "";
        for(let y=0;y<matsize[1];y++){
            const column = []
            for(let x=0;x<matsize[0];x++){
                let c = false;
                if(colStartTrue&&x==0&&y==0){
                    c = true;
                }else{
                    let prpb = 0.3;
                    const up =  y!=0 && matrix[y-1][x] == true;
                    const left = x!=0 && column[x-1] == true;
                    if(up ^ left){
                        prpb += 0.4;
                    }else if(up && left){
                        prpb -= 0.2;
                    }
                    if(Math.random()<prpb){
                        c = true;
                    }
                }
                column.push(c);
            }
            matrix.push(column)
        }
        //上下前後に空白追加
        const retMatrix = []
        retMatrix.push(new Array(this.x+2).fill(false));
        retMatrix.push(...matrix.map((col)=>{
            const newCol = [];
            newCol.push(false);
            newCol.push(...col);
            newCol.push(false);
            return newCol;
        }))
        retMatrix.push(new Array(this.x+2).fill(false));
        return retMatrix;
    }
    debugMatrix(matrix){
        let txt = "";
        for(const col of matrix){
            for(const char of col){
                txt += char?"█":"_";
            }
            txt += "\n";
        }
        console.debug(txt);
    }
    get(colStartTrue){
        const mat= this.generate(colStartTrue);
        this.debugMatrix(mat);
        const textsize = [this.x+1,this.y+1]
        let txt = "";
        for(let y=0;y<textsize[1];y++){
            for(let x=0;x<textsize[0];x++){
                const mawari = this.mawari(mat,x,y);
                switch(mawari){
                    case "    ":
                    case "####":
                        txt+= "　";break;
                    case "   #":
                    case "### ":
                        txt+= "┏";break;
                    case "  # ":
                    case "## #":
                        txt+= "┓";break;
                    case "  ##":
                    case "##  ":
                        txt+= "━";break;
                    case " #  ":
                    case "# ##":
                        txt+= "┗";break;
                    case " # #":
                    case "# # ":
                        txt+= "┃";break;
                    case " ## ":
                    case "#  #":
                        txt+= "╋";break;
                    case " ###":
                    case "#   ":
                        txt+= "┛";break;
                }
            }
            txt += "\n";
        }
        return txt;
    }
    mawari(matrix,x,y){
        let ret = "";
        ret += matrix[y][x]?"#":" ";
        ret += matrix[y][x+1]?"#":" ";
        ret += matrix[y+1][x]?"#":" ";
        ret += matrix[y+1][x+1]?"#":" ";
        return ret;
    }
}