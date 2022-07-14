import json
import os

class Puzzle:
    '''Parse puzzle and add grid coordinates of all words to JSON file
    + implement continuous numbering'''

    def __init__(self, puzzle):
        
        self.puzzle = puzzle
        self.height = puzzle['height'] 
        self.width = puzzle['width']
        self.values = puzzle['values']
        # self.grid = self.list_to_grid(self.values, self.width)
        self.max_value = self.find_max_value()
        self.hwords = puzzle['hwords']
        self.hclues = puzzle['hclues']
        self.vwords = puzzle['vwords']
        self.vclues = puzzle['vclues']
        self.total_words = self.find_number_of_words()
        self.find_doubles()
        self.words_indices = self.make_word_indices()

    def find_number_of_words(self):
        '''Find the total number of words in puzzle'''
        
        return len(self.hwords.keys()) + len(self.vwords.keys())


    def find_max_value(self):
        values = [x for x in self.values if type(x)==int]
        return max(values)

    def make_word_indices(self):
        '''Find value list indices of all words'''

        words = [[]] * (self.total_words + 1)

        def make_lists(word_list, step):
            for word in word_list:

                # Clue/word number is first list element
                word_index = int(word[0])

                # Word is second  listelement
                word_length = len(word[1])

                # Find number in self.values
                for i in range(len(self.values)):

                    # If starting point of two words, values[i] is a list of these two numbers
                    if isinstance(self.values[i], list):
                         
                         for j in range(len(self.values[i])):
                            if self.values[i][j] == word_index:
                                if step == 1:

                                    # i is the location of the word's first letter
                                    location = list(range(i, (i + word_length), step))
                                else:
                                    location = list(range(i, (i + (word_length * step)), step))
                    
                    else:
                        if self.values[i] == word_index:
                            if step == 1:
                                location = list(range(i, (i + word_length), step))
                            else:
                                location = list(range(i, (i + (word_length * step)), step))
                
                words[word_index] = location

        make_lists(self.puzzle['hwords'].items(), 1)
        make_lists(self.puzzle['vwords'].items(), self.width)

        return words


    def find_doubles(self):
        '''Some crosswords have double clue numbers for horizontal and vertical clues.
            This function appends these double values to the end of the list,
            providing them with a unique number.'''

        for i in self.vwords:
            if i in self.hwords:
                self.hwords[new_index] = self.hwords[i]
                self.hclues[new_index] = self.hclues[i]
                self.hwords.pop(i, None)
                self.hclues.pop(i, None)
                self.values
                
                # Append new number to values list
                values_index = self.values.index(int(i))
                self.values[values_index] = [self.values[values_index], new_index]

                # Increase number for next word/clue
                new_index +=1
            

    def find_doubles(self):
        '''Some crosswords have double clue numbers for horizontal and vertical clues.
            This function appends these double values to the end of the list,
            providing them with a unique number.'''

        new_index = self.max_value + 1
        for i in self.vwords:
            if i in self.hwords:
                self.hwords[new_index] = self.hwords[i]
                self.hclues[new_index] = self.hclues[i]
                self.hwords.pop(i, None)
                self.hclues.pop(i, None)
                self.values
                
                # Append new number to values list
                values_index = self.values.index(int(i))
                self.values[values_index] = [self.values[values_index], new_index]

                # Increase number for next word/clue
                new_index +=1
            
    def print_grid(self):
        for i in self.grid:
            print(i)

if __name__ == "__main__":

    dir_name='Data/Puzzles'
    base_filename='2'
    suffix = '.json'

    path = os.path.join(dir_name, base_filename + suffix)
    file = path
    f = open(file)
    data = json.load(f)
    p1 = Puzzle(data)

    data['words_indices'] = p1.words_indices
    data['hwords'] = p1.hwords
    data['hclues'] = p1.hclues
    new_json = os.path.join(dir_name, "Modified",  base_filename + suffix)
    with open(new_json, 'w') as json_file:
        json.dump(data, json_file)
    f.close()

    def get_shared_values(self, word_num, values):
        '''Check whether box shares letters with other words'''
        shared = {}
        for i in values:
            if self.values[i] != 0 and self.values[i] != word_num:
                shared[i]
        

    def list_to_grid(self, values, width):
        '''Split values list into multiple lists to create matrix'''

        chunked_list = []
        for i in range(0, len(values), width):
            chunked_list.append(values[i:i+width])
        return chunked_list