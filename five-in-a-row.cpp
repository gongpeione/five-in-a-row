/**
 *
 *
 *
 */

#include "stdio.h"
#include "stdlib.h"
#include "shu.h"
#include "time.h"

char checkerBoard[15][15] = {0}; //����������

void PaintStartMenu()           //�����ʼ�˵�
{
    printf( " ------------------------------------------ \n"
            "|              ˫��������                  |\n"
            "|         ---------------------            |\n"
            "|                                          |\n"
            "|              1.��ʼ��Ϸ                  |\n"
            "|              2.��Ϸ˵��                  |\n"
            "|              3.�鿴��¼                  |\n"
            "|              4.���ڳ���                  |\n"
            "|              5.�˳�����                  |\n"
            "|                                          |\n"
            " ------------------------------------------ \n");
}

void PaintCheckerBoard(int line,int column)     //��������
{
    printf("\n 1 ���ששששששששששששש�\n");

    for(char i=0;i<13;i++)
    {
        printf("%2d ��",i+2);
        for(char j=0;j<13;j++)
        {
            printf("��");
        }
        printf("��\n");
    }

    printf("15 ���ߩߩߩߩߩߩߩߩߩߩߩߩߩ�\n");
    printf("   A B C D E F G H I J K L M N O P\n");
}

int CheckCheckerBoard(int line,int column,int type)
{
    checkerBoard[line][column] = type? 1:2;
}

int StartGame()
{
    char whiteOrBlack[2][3] = {{"��"},{"��"}};
    char temp;
    char player[2][10];

    /*     ���������Ϣ      */
    fflush(stdin);
    printf("���������1�����֣�");
    fgets(player[0],10,stdin);
    fflush(stdin);
    printf("���������2�����֣�");
    fgets(player[1],10,stdin);
    fflush(stdin);

    /*     ����жϺڰ�     */
    srand(time(NULL));
    temp = rand()%2;

    /*       �״����        */
    system("cls");
    printf("���1(%s)��%s���2(%s)��%s\n",whiteOrBlack[temp],player[0],whiteOrBlack[!temp],player[1]);
    printf("�� %s ִ������\n",player[temp]);
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
