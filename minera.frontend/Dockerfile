FROM nginx
COPY ./dist/fuse /usr/share/nginx/html
COPY nginx_default.conf /etc/nginx/conf.d/default.conf
#COPY docker-entrypoint.sh /usr/local/bin
#RUN ["chmod", "+x", "/usr/local/bin/docker-entrypoint.sh"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]