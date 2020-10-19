#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <stdlib.h>


int parse(char* input, char** params){
    int index = 0;

    char* param;

    params[index++] = strtok(input, " ");
    while ((param = (strtok(NULL, " ")))){
        params[index++] = param;
    }

    params[index] = NULL;
    return index;
}

int route(char** params){
	char* cmd = params[0];

	if (strcmp(cmd, "echo") == 0) {
		int index = 1;
		while(params[index]) {
			printf("%s ", params[index]);
			index++;
		}
		printf("\n");
	}

	if (strcmp(cmd, "pwd") == 0) {
		char cwd[80];
		printf("%s\n", getcwd(cwd, sizeof(cwd)));
	}
	if (strcmp(cmd, "exit") == 0) {
		exit(0);
	}

	return 0;
}

int main(){
	char input[1024];
	char* params[128];
	char* r;

    printf("> ");		
	while((r = gets(input)) != NULL) {
		parse(input, params);
		route(params);
		printf("> ");
	}

	return 0;
}
