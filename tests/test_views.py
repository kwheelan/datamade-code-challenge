from django.urls import reverse

def retrieve_data(client, address_string):
    # URL for the API endpoint
    url = reverse('address-parse') 
    
    # Send GET request to the API endpoint with the given address
    response = client.get(url, {'address': address_string})
    
    # Retrieve and return the JSON response
    return response.json(), response.status_code

def test_api_parse_succeeds(client):
    ''' Test a successful case '''
    
    # Send test string to API endpoint and retrieve response
    address_string = '123 main st chicago il'
    json_data, status_code = retrieve_data(client, address_string)
    
    # Assert the response status code is 200 OK
    assert status_code == 200
    
    # Assert the response contains appropriate data and data structures
    assert json_data['status'] == 'success'
    assert json_data['input_string'] == address_string
    assert 'address_components' in json_data
    assert isinstance(json_data['address_components'], dict)
    assert 'address_type' in json_data

def test_api_parse_raises_error(client):
    ''' Test an unsuccessful case '''
    
    # Send test string to API endpoint and retrieve response
    address_string = '123 main st chicago il 123 main st'
    json_data, status_code = retrieve_data(client, address_string)
    
    # Assert the response status code is not OK
    assert status_code != 200
    
    # Assert the response contains appropriate data and data structures
    assert json_data['status'] == 'error'
    assert json_data['input_string'] == address_string
    assert json_data['address_components'] is None
    assert json_data['address_type'] is None
    assert json_data['message'] is not None # make sure there's an error message
