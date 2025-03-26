import requests
from flask import Flask, request, jsonify

url = "https://openlibrary.org/search.json?q=test"
headers = {
    "User-Agent": "ShelfLife/0.1 (connorb24@vt.edu)"
}
response = requests.get(url, headers=headers)

def get_book(work_id):
    """
    Fetch a book from the API based on the Work ID.
    
    Args:
        work_id (str): The Work ID of the book.
    
    Returns:
        dict: A dictionary containing the book information. (title, author, description, cover ID)
    """
    api_book_url = f'https://openlibrary.org/works/{work_id}.json'
    try:
        book_response = requests.get(api_book_url)
        book_response.raise_for_status()  # Raises an HTTPError for bad responses
        book_data = book_response.json()

        title = book_data.get('title', 'No title available')
        # getting author name
        author_list = book_data.get('authors')
        author = "Unavailable"
        if len(author_list) > 0:
            author_key = author_list[0]['author']['key'].split('/')[-1]
            author_url = f'https://openlibrary.org/authors/{author_key}.json'
            author_response = requests.get(author_url)
            author_data = author_response.json()
            author = author_data.get('name', 'Unknown author')


        description = book_data.get('description', 'Unavailable')
        # Check if the description is a dictionary and extract the 'value' field
        if isinstance(description, dict):
            description = description.get('value', 'Unavailable')

        cover_id = book_data.get('covers', [None])[0]

        cover_url_L = f'Unavailable'
        cover_url_M = f'Unavailable'
        cover_url_S = f'Unavailable'
        if cover_id:
            cover_url_L = f'https://covers.openlibrary.org/b/id/{cover_id}-L.jpg'
            cover_url_M = f'https://covers.openlibrary.org/b/id/{cover_id}-M.jpg'
            cover_url_S = f'https://covers.openlibrary.org/b/id/{cover_id}-S.jpg'

        book = {
            'title': title,
            'author': author,
            'work_id': work_id,
            'description': description,
            'img_S': cover_url_S,
            'img_M': cover_url_M,
            'img_L': cover_url_L,
        }
        return book
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}

def parse_books(data):
    books = []
    for doc in data.get('docs', []):
        work_id = doc.get('key').split('/')[-1]
        book = get_book(work_id)
        books.append(book)
    return books

def fetch_books_from_api(query=None, title=None, author=None, subject=None, limit=1):
    """
    Fetch books from the public API based on the search query, title, author, or subject.
    
    Args:
        query (str): The general search query string.
        title (str): The book title to search for.
        author (str): The author name to search for.
        subject (str): The subject to search for.
    
    Returns:
        dict: The JSON response from the API, containing the work_id of the books.
    """
    api_url = 'https://openlibrary.org/search.json'
    params = {}

    if query:
        params['q'] = query
    if title:
        params['title'] = title
    if author:
        params['author'] = author
    if subject:
        params['subject'] = subject
    params['limit'] = limit
    params['fields'] = 'key'

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        return parse_books(response.json())
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}