//this is used by linux to send videos (which the model would run on)
// sudo apt install libcurl4-openssl-dev
#include <stdio.h>
#include <curl/curl.h>
#include <sys/stat.h>
#include <fcntl.h>

int main(void) {
    CURL *curl;
    CURLcode response;
    struct stat file_info;
    curl_off_t speed_upload, total_time;
    FILE *fd;

    fd = fopen("./saved_video/test.mp4", "rb"); /* open file to upload */
    if(!fd)
        return 1; /* cannot continue */

    /* to get the file size */
    if(fstat(fileno(fd), &file_info) != 0)
        return 1; /* cannot continue */

    curl_global_init(CURL_GLOBAL_ALL);

    curl = curl_easy_init();
    if(curl) {

        struct curl_slist *headers = NULL;
        // headers = curl_slist_append(headers, "Accept: application/json");
        headers = curl_slist_append(headers, "Content-Type: video/mp4");
        // headers = curl_slist_append(headers, "charset: utf-8");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers); 
        curl_easy_setopt(curl, CURLOPT_URL, "http://391server-env.eba-6eyremyt.ca-central-1.elasticbeanstalk.com/de1/test2.mp4");
        // curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "{\"first_name\": \"daniel\", \"last_name\": \"Wu\"}");
        /* tell it to "upload" to the URL */
        curl_easy_setopt(curl, CURLOPT_UPLOAD, 1L);
 
        /* set where to read from (on Windows you need to use READFUNCTION too) */
        curl_easy_setopt(curl, CURLOPT_READDATA, fd);
 
        /* and give the size of the upload (optional) */
        curl_easy_setopt(curl, CURLOPT_INFILESIZE_LARGE, (curl_off_t)file_info.st_size);
 
        /* enable verbose for easier tracing */
        curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L);

        response = curl_easy_perform(curl);

        if(response != CURLE_OK) {
            fprintf(stderr, "Request failed: %s\n", curl_easy_strerror(response));
        } else {
            printf("response\n");
        }
        curl_easy_cleanup(curl);
    }
    fclose(fd);
    curl_global_cleanup();
    return 0;
}