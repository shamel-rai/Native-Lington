import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { theme } from '../constants/theme'; // Assuming you have a theme defined

const MultiOptionDropdown = ({ options, selectedOptions, onSelectionChange }) => {
    const [isModalVisible, setModalVisible] = useState(false); // To show/hide dropdown
    const [selectedValues, setSelectedValues] = useState(selectedOptions || []); // Selected values
    const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering options
    const [availableOptions, setAvailableOptions] = useState(options); // Options to show in the dropdown

    // Handle selecting a value
    const handleSelect = (itemValue) => {
        if (!selectedValues.includes(itemValue)) {
            const newSelectedValues = [...selectedValues, itemValue];
            setSelectedValues(newSelectedValues);
            onSelectionChange(newSelectedValues);
            // Remove the selected option from available options
            setAvailableOptions(availableOptions.filter(option => option !== itemValue));
        }
    };

    // Handle removing a selected value
    const handleRemove = (itemValue) => {
        const newSelectedValues = selectedValues.filter(value => value !== itemValue);
        setSelectedValues(newSelectedValues);
        onSelectionChange(newSelectedValues);
        // Add the removed option back to the available options
        setAvailableOptions(prevOptions => [...prevOptions, itemValue]);
    };

    // Filter options based on search query
    const filteredOptions = availableOptions.filter(option =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select Interests</Text>
            </TouchableOpacity>

            {/* Display selected options */}
            <View style={styles.selectedItemsContainer}>
                {selectedValues.map((value, index) => (
                    <View key={index} style={styles.selectedItem}>
                        <Text style={styles.selectedText}>{value}</Text>
                        <TouchableOpacity
                            onPress={() => handleRemove(value)} // Remove selected option
                            style={styles.removeButton}
                        >
                            <Text style={styles.removeText}>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Modal for Dropdown */}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select Interests</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />

                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.optionItem}
                                    onPress={() => handleSelect(item)} // Select the option
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    selectButton: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    selectButtonText: {
        color: 'white',
        fontSize: 16,
    },
    selectedItemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    selectedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: theme.colors.lightGray,
        padding: 5,
        borderRadius: 5,
    },
    selectedText: {
        color: theme.colors.text,
    },
    removeButton: {
        marginLeft: 5,
        backgroundColor: theme.colors.danger,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 15,
    },
    removeText: {
        color: 'white',
        fontSize: 12,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        alignItems: 'center',
        marginBottom: 10,
    },
    closeButtonText: {
        color: theme.colors.primary,
        fontSize: 16,
    },
    optionItem: {
        padding: 10,
        backgroundColor: theme.colors.lightGray,
        marginBottom: 5,
        borderRadius: 5,
    },
    optionText: {
        color: theme.colors.text,
    },
    searchInput: {
        padding: 10,
        backgroundColor: theme.colors.lightGray,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default MultiOptionDropdown;
