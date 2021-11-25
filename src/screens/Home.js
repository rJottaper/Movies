import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';

import axios from 'react-native-axios';
import PromisePool from '@supercharge/promise-pool';

import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import Button from '../components/Button'

const Home = ({ route }) => {
  const { username } = route.params

  const [movies, setMovies] = useState([]);
  const [resultMovies, setResultMovies] = useState([]);
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);

  // Search Bar 
  useEffect(() => {
    if (search === '') {
      setMovies(resultMovies);
    } else {
      setMovies(
        movies.filter(item => {
          return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
        })
      )
    }
  }, [search])

  useEffect(() => {
    setMovies(resultMovies);
  }, [resultMovies])

  // API
  // Get IDs and Format
  const [ids, setIds] = useState([]);
  const [formatIDS, setFormatIDS] = useState([]);

  const GetIDS = () => {
    var options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/title/get-most-popular-movies',
      params: {homeCountry: 'US', purchaseCountry: 'US', currentCountry: 'US'},
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': 'f40670f590mshafba4ba9b689dc9p126215jsnb6664ddb97ab'
      }
    };
    
    axios.request(options).then(function (response) {
      setIds(response.data);     
    }).catch(function (e) {
      console.log(e);
    });
  };

  const FormatIDS = (id) => {
    const arraySplitResult = id.toString().split('/');
    return arraySplitResult[2];
  };

  useEffect(() => {
    const IDS = () => {
      return (
        ids.map(item => (
          FormatIDS(item)
        ))
      );
    };
    setFormatIDS(IDS);
  }, [ids]);
  
  formatIDS.splice(20);
  
  // Get Items
  const GetItems = async () => {
  const { results, errors } = await PromisePool
    .withConcurrency(2)
    .for(formatIDS)
    .process(async (id) => {
      var options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
        params: {tconst: id, currentCountry: 'US'},
        headers: {
          'x-rapidapi-host': 'imdb8.p.rapidapi.com',
          'x-rapidapi-key': 'f40670f590mshafba4ba9b689dc9p126215jsnb6664ddb97ab'
        }
      };

      try {
        const response = await axios.request(options);
        const title = response.data.title.title;
        const sinopse = response.data.plotOutline.text;
        const image = response.data.title.image.url;
         
        const result = (oldMovies => [ ...oldMovies, { id, title, sinopse, image }]); 
        setLoading(false);
        return setResultMovies(result);  
      } catch (e) {
        console.log(e);
      };
  });
  };

  useEffect(() => {
    GetIDS();
    
  }, []);

  useEffect(() => {
    GetItems();
  }, [formatIDS]); 

  // Modal
  const [modal, setModal] = useState([]);
  const modalizeRef = useRef(null);

  const OpenModal = (id) => {
    const findId = movies.find(item => item.id == id)
    setModal(findId)
    modalizeRef.current?.open();
  };

  const CloseModal = () => {
    modalizeRef.current?.close();
  };

  if (loading == true) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.greetings}>
            <Text style={styles.title}>Hey {username},</Text>
            <Text style={styles.subtitle}>What will you watch today?</Text>    
          </View> 
          <SearchBar />       
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0875B9" />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <View style={styles.greetings}>
              <Text style={styles.title}>Hey Admin,</Text>
              <Text style={styles.subtitle}>What will you watch today?</Text>    
            </View> 
            <SearchBar value={search} newValue={(value) => setSearch(value)} />     
          </View>
          <View style={styles.cards}>
            <FlatList 
              data={movies}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Card title={item.title} urlImage={item.image} onPress={() => OpenModal(item.id)}/>}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'center'}}
              style={{ marginTop: 20 }}
            />
          </View>
        </SafeAreaView>
        <Modalize
          ref={modalizeRef}
          snapPoint={600}
        >
          <View>
            <Image style={styles.modalImage} source={{ uri: modal.image }} />
            <Text style={styles.modalTitle}>{modal.title}</Text>
            <Text style={styles.modalDescription}>{modal.sinopse}</Text>
            <Button title="Catalogar" background="#0875B9" color="#FFFFFF" onPress={() => CloseModal()} />
          </View>
        </Modalize>
      </View>
    );
  };
  }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    justifyContent: 'space-between',
    backgroundColor: '#0875B9',
    height: 160,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 15
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 15
  },
  greetings: {
    marginTop: 20
  },
  cards: {
    flex: 1,
    marginTop: 30,
  },
  modalImage: {
    width: '100%',
    height: 450
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0875B9',
    marginTop: 15,
    marginHorizontal: 15
  },
  modalDescription: {
    fontSize: 16,
    color: '#0875B9',
    marginHorizontal: 20,
    marginVertical: 20
  }
});

export default Home;