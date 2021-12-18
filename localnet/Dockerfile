FROM ubuntu:20.04

RUN apt-get update && apt-get install -y git build-essential wget
RUN wget https://github.com/mikefarah/yq/releases/download/v4.9.3/yq_linux_amd64 -O /usr/bin/yq && chmod +x /usr/bin/yq

COPY ./ /app

WORKDIR /app

RUN sh dev/proto/install-golang.sh

ENV GOROOT /usr/local/go
ENV GOPATH /go
ENV GOBIN /go/bin
ENV PATH $GOBIN:$GOROOT/bin:$PATH

RUN make build

WORKDIR /app/build

RUN ./erratad init localnet --chain-id errata-localnet-1

RUN sed -i 's#tcp://127.0.0.1:26657#tcp://0.0.0.0:26657#g' ~/.errata/config/config.toml
RUN sed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = \["*"\]/g' ~/.errata/config/config.toml
RUN sed -i 's/pruning = "default"/pruning = "nothing"/g' ~/.errata/config/app.toml
RUN sed -i 's/enable = false/enable = true/g' ~/.errata/config/app.toml
RUN sed -i 's/swagger = false/swagger = true/g' ~/.errata/config/app.toml
RUN sed -i 's/enabled-unsafe-cors = false/enabled-unsafe-cors = true/g' ~/.errata/config/app.toml

RUN echo "high gain deposit chuckle hundred regular exist approve peanut enjoy comfort ride" | ./erratad keys add val --recover --keyring-backend test
RUN echo "health nest provide snow total tissue intact loyal cargo must credit wrist" | ./erratad keys add local1 --recover --keyring-backend test
RUN echo "canyon stone next tenant trial ugly slim luggage ski govern outside comfort" | ./erratad keys add local2 --recover --keyring-backend test
RUN echo "travel renew first fiction trick fly disease advance hunt famous absurd region" | ./erratad keys add local3 --recover --keyring-backend test

RUN ./erratad add-genesis-account $(./erratad keys show val -a --keyring-backend test) 100000000000uert
RUN ./erratad add-genesis-account $(./erratad keys show local1 -a --keyring-backend test) 100000000uert
RUN ./erratad add-genesis-account $(./erratad keys show local2 -a --keyring-backend test) 100000uert
RUN ./erratad add-genesis-account $(./erratad keys show local3 -a --keyring-backend test) 100000uert

RUN ./erratad gentx val 1000000uert --chain-id errata-localnet-1 --keyring-backend test
RUN ./erratad collect-gentxs

EXPOSE 26657
EXPOSE 1317
EXPOSE 9090
CMD ./erratad start
