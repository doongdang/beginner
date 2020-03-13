import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";
import Loader from "components/Loader";
import Message from "../../components/Message";
import Tabs from "./Tabs";
import Product from "./Product";
import Procoun from "./Procoun";

require("./TabStyle.css");

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomfilx</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}
          | Nomfilx
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />

        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>
              {window.location.pathname.includes("show")
                ? result.seasons[result.seasons.length - 1].name
                : result.status}
            </Item>
            <Divider>•</Divider>
            <Item>
              <a
                rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="_blank"
              >
                <button>IMDB</button>
              </a>
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>

          <Tabs>
            <div label="Youtube Trailer">
              {result.videos.results[0] !== undefined ? (
                <a
                  rel="noopener noreferrer"
                  href={`https://www.youtube.com/watch?v=${result.videos.results[0].key}`}
                  target="_blank"
                >
                  <em>Official Trailer Video With Youtube</em>
                </a>
              ) : (
                <span>"No Information"</span>
              )}
            </div>
            <div label="Production Companies">
              {result.production_companies.length !== 0 ? (
                result.production_companies.map(company => {
                  return (
                    <Product
                      key={company.id}
                      title={company.name}
                      poster={company.logo_path}
                    />
                  );
                })
              ) : (
                <span>No Information</span>
              )}
            </div>
            <div
              label={
                window.location.pathname.includes("movie")
                  ? "Production Contries"
                  : "Created By"
              }
            >
              {window.location.pathname.includes("movie")
                ? result.production_countries.map(country => {
                    return (
                      <Procoun key={country.iso_3166_1} title={country.name} />
                    );
                  })
                : result.created_by.map(created => {
                    return (
                      <Product
                        key={created.id}
                        title={created.name}
                        poster={created.profile_path}
                      />
                    );
                  })}
              {console.log(result)}
            </div>
          </Tabs>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
