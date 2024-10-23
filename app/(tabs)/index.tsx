
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import fetchfood from '@/hooks/fetchdata'; // Custom hook
import Icon from 'react-native-vector-icons/FontAwesome';  // Example: Importing FontAwesome


export default function HomeScreen() {
  const { data, loading, error } = fetchfood({ url: 'https://simple-grocery-store-api.online/products' }); // Fetch data from the API
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Filter the data based on search text or categories
  useEffect(() => {
    if (searchText) {
      const filtered = data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchText, data]);

  const categories = ["Fruits", "Vegetables", "Bakery", "Milk"]; // You can dynamically fetch this if needed

  const renderProductItem = ({ item }: any) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
     <View style={styles.productCard2}>
      <View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productSubtitle}>from Tesco</Text>
      </View>

      <View>
        <Text style={styles.productPrice}>${item.id}</Text>
      </View>
     </View>
     
      

      <Icon style={styles.addSign} name="plus" size={20} color="green" />
    </View>

  );

  //   <View style={styles.categoryContainer}>
  //   {categories.map((category) => (
  //     <TouchableOpacity
  //       key={category}
  //       style={[
  //         styles.categoryButton,
  //         selectedCategory === category && styles.categorySelected, // Change color when selected
  //       ]}
  //       onPress={() => handleCategoryPress(category)}
  //     >
  //       <Icon name="search" size={40} color="green" />
  //       <Text style={styles.categoryText}>{category}</Text>
  //     </TouchableOpacity>
  //   ))}
  // </View>


  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>

        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={30} color="green" /><Text style={styles.filterText}>FILTER</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity key={category} style={styles.categoryButton}>
            <Icon style={styles.categoryicon} name="search" size={30} color="green" />

            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products List */}
      <FlatList
        data={filteredData}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // Display as a grid
        contentContainerStyle={styles.productList}
      />

      {/* Discount Banner */}
      <View style={styles.discountBanner}>
        <Text style={styles.discountTitle}>50% OFF</Text>
        <Text>A Spring Surprise</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    elevation: 10,


  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 8,
    backgroundColor: 'white'
  },
  filterButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 6

  },
  filterText: {
    color: 'black',
    fontWeight: 'bold',

  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginBottom: 16,
   
  },
  categoryButton: {
    padding: 8,
    borderRadius: 8,
  },
  categoryicon:{
    // backgroundColor:'black',
    padding:15,
    borderColor: 'grey',  // Border color
    borderWidth: 2,       // Border thickness
    borderRadius: 10,  
    marginBottom:2,  

  },
  categoryText: {
    fontSize: 14,
    color: '#555',
    textAlign:'center',
  },
  productList: {
    paddingTop: 16,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFE0B2',
    padding: 16,
    borderRadius: 10,
    // alignItems: 'center',
    elevation: 3, // Adds shadow to the card
    position: 'relative', // Needed for absolute positioning of the icon
  },
  addSign: {
    position: 'absolute',
    right: -1, // Distance from the right
    bottom: -2, // Distance from the bottom
    backgroundColor: '#E7EBEE',
    padding: 15,
    borderTopLeftRadius: 25, // Makes the background circular
    zIndex: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  productCard2:{
    flexDirection:'column',
    justifyContent:'space-between',
    height:150
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
   
  },
  productSubtitle: {
    fontSize: 12,
    color: '#777',
   
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',

  },

  discountBanner: {
    backgroundColor: '#FFEB3B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  discountTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
});



// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
// import fetchfood from '@/hooks/fetchfood'; // Custom hook

// export default function HomeScreen() {
//   const { data, loading, error } = fetchfood({url:'https://simple-grocery-store-api.online/products'}); // Fetch data from the API
//   const [searchText, setSearchText] = useState('');
//   const [filteredData, setFilteredData] = useState(data);

//   // Filter the data based on search text or categories
//   useEffect(() => {
//     if (searchText) {
//       const filtered = data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
//       setFilteredData(filtered);
//     } else {
//       setFilteredData(data);
//     }
//   }, [searchText, data]);

//   const categories = ["Fruits", "Vegetables", "Bakery", "Milk"]; // You can dynamically fetch this if needed

//   const renderProductItem = ({ item }:any) => (
//     <View style={styles.productCard}>
//       <Image source={{ uri: item.image }} style={styles.productImage} />
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productPrice}>${item.price}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search for products"
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//         <TouchableOpacity style={styles.filterButton}>
//           <Text style={styles.filterText}>FILTER</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Categories */}
//       <View style={styles.categoryContainer}>
//         {categories.map(category => (
//           <TouchableOpacity key={category} style={styles.categoryButton}>
//             <Text style={styles.categoryText}>{category}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Products List */}
//       <FlatList
//         data={filteredData}
//         renderItem={renderProductItem}
//         keyExtractor={item => item.id.toString()}
//         numColumns={2} // Display as a grid
//         contentContainerStyle={styles.productList}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   searchInput: {
//     flex: 1,
//     padding: 10,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   filterButton: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     borderRadius: 8,
//   },
//   filterText: {
//     color: '#fff',
//   },
//   categoryContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 16,
//   },
//   categoryButton: {
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//   },
//   categoryText: {
//     fontSize: 14,
//   },
//   productList: {
//     paddingTop: 16,
//   },
//   productCard: {
//     flex: 1,
//     margin: 8,
//     backgroundColor: '#f9c2ff',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     marginBottom: 8,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   productPrice: {
//     fontSize: 14,
//     color: 'green',
//   },
// });
