FROM python:3.9 as dev

WORKDIR /app

COPY ./requirements/ ./requirements
RUN cd requirements && pip install --no-cache-dir -r development.txt

CMD ["python3", "app.py"]

# base image
FROM dev as prod

COPY . /app
