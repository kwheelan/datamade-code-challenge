import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import ParseError
from rest_framework import status

class Home(TemplateView):
    template_name = 'parserator_web/index.html'

class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        '''Parse an address string and return the parsed components to the frontend.'''

        # get address from POST request
        address = request.query_params.get('address', None)
        if not address:
            data = {
                'input_string': None,
                'address_components': None,
                'address_type': None,
                'status': 'error',
                'message': 'No address to parse.'
            }
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        # Use parse method to get address_components and address_type
        address_components, address_type = self.parse(address)

        # if parse returns an error, pass error details to frontend
        if isinstance(address_components, Exception):
            data = {
                'input_string' : address,
                'address_components' : None,
                'address_type' : None,
                'status' : 'error',
                'message' : str(address_components) # text of error from parse
            }
            return Response(data, status = status.HTTP_422_UNPROCESSABLE_ENTITY)
        else:
            # expected response
            data = {
                'input_string': address,
                'address_components': address_components,
                'address_type': address_type,
                'status': 'success',
                'message' : None
            }
            return Response(data, status = status.HTTP_200_OK)            

    def parse(self, address):
        ''' Return the parsed components of a given address using usaddress '''
        try:
            address_components, address_type = usaddress.tag(address)
            return address_components, address_type
        except Exception as e: 
            return e, None