import json
import os

class Puzzle:

    def __init__(self, puzzle):
        
        self.puzzle = puzzle
        self.height = puzzle['height'] 
        self.width = puzzle['width']
        self.values = puzzle['values']
        # self.grid = self.list_to_grid(self.values, self.width)
        self.total_words = self.find_number_of_words()
        self.words_indices = self.make_word_indices()
        # self.value_

    def find_number_of_words(self):
        '''Find the total number of words in puzzle'''

        values = [x for x in self.values if type(x)==int]
        return max(values)

    def make_word_indices(self):
        '''Find value list indices  of all words'''

        words = [[]] * (self.total_words + 1)

        def make_lists(word_list, step):
            for word in word_list:
                index = int(word[0])
                word_length = len(word[1])
                for i in range(len(self.values)):
                    if self.values[i] == index:
                        if step == 1:
                            location = list(range(i, (i + word_length), step))
                        else:
                            location = list(range(i, (i + (word_length * step)), step))
                
                words[index] = location

        make_lists(self.puzzle['hwords'].items(), 1)
        make_lists(self.puzzle['vwords'].items(), self.width)

        return words

    def print_grid(self):
        for i in self.grid:
            print(i)

if __name__ == "__main__":

    dir_name='Data/Puzzles'
    base_filename='1'
    suffix = '.json'

    path = os.path.join(dir_name, base_filename + suffix)
    file = path
    f = open(file)
    data = json.load(f)
    p1 = Puzzle(data)

    data['words_indices'] = p1.words_indices
    new_json = os.path.join(dir_name, "Modified",  base_filename + suffix)
    with open(new_json, 'w') as json_file:
        json.dump(data, json_file)
    f.close()


      # def get_shared_values(self, word_num, values):
    #     '''Check whether box shares letters with other words'''
    #     shared = {}
    #     for i in values:
    #         if self.values[i] != 0 and self.values[i] != word_num:
    #             shared[i]
        
    # def get_word_indices(self):

    # def list_to_grid(self, values, width):
    #     '''Split values list into multiple lists to create matrix'''

    #     chunked_list = []
    #     for i in range(0, len(values), width):
    #         chunked_list.append(values[i:i+width])
    #     return chunked_list