/**
 *
 *
 *
 */

#include "stdio.h"
#include "stdlib.h"
#include "shu.h"
#include "time.h"

char checkerBoard[15][15] = {0}; //建立空棋盘

void PaintStartMenu()           //输出开始菜单
{
    printf( " ------------------------------------------ \n"
            "|              双人五子棋                  |\n"
            "|         ---------------------            |\n"
            "|                                          |\n"
            "|              1.开始游戏                  |\n"
            "|              2.游戏说明                  |\n"
            "|              3.查看记录                  |\n"
            "|              4.关于程序                  |\n"
            "|              5.退出程序                  |\n"
            "|                                          |\n"
            " ------------------------------------------ \n");
}

void PaintCheckerBoard(int line,int column)     //绘制棋盘
{
    printf("\n 1 ┏┳┳┳┳┳┳┳┳┳┳┳┳┳┓\n");

    for(char i=0;i<13;i++)
    {
        printf("%2d ┣",i+2);
        for(char j=0;j<13;j++)
        {
            printf("╋");
        }
        printf("┫\n");
    }

    printf("15 ┗┻┻┻┻┻┻┻┻┻┻┻┻┻┛\n");
    printf("   A B C D E F G H I J K L M N O P\n");
}

int CheckCheckerBoard(int line,int column,int type)
{
    checkerBoard[line][column] = type? 1:2;
}

int StartGame()
{
    char whiteOrBlack[2][3] = {{"黑"},{"白"}};
    char temp;
    char player[2][10];

    /*     输入玩家信息      */
    fflush(stdin);
    printf("请输入玩家1的名字：");
    fgets(player[0],10,stdin);
    fflush(stdin);
    printf("请输入玩家2的名字：");
    fgets(player[1],10,stdin);
    fflush(stdin);

    /*     随机判断黑白     */
    srand(time(NULL));
    temp = rand()%2;

    /*       首次输出        */
    system("cls");
    printf("玩家1(%s)：%s玩家2(%s)：%s\n",whiteOrBlack[temp],player[0],whiteOrBlack[!temp],player[1]);
    printf("由 %s 执黑先行\n",player[temp]);
    PaintCheckerBoard(0,0);

    while(1)
    {

    }
}

int main()
{
    while(1)
    {
        PaintStartMenu();
        switch(checkOption(5))
        {
            case 1:
                system("cls");
                StartGame();

        }

    }

}
